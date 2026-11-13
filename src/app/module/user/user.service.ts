import type { Prisma, Role, UserStatus } from "@prisma/client";
import httpStatus from "http-status";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

const listUsers = async (query: {
  page?: string;
  limit?: string;
  search?: string;
  role?: Role;
}) => {
  const page = Math.max(1, Number(query.page || 1));
  const limit = Math.min(100, Math.max(1, Number(query.limit || 20)));
  const search = query.search?.trim();

  const where: Prisma.UserWhereInput = {
    isDeleted: false,
    ...(query.role ? { role: query.role } : {}),
    ...(search
      ? {
          OR: [{ name: { contains: search } }, { email: { contains: search } }],
        }
      : {}),
  };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      omit: { password: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

const updateUser = async (
  id: string,
  payload: { name?: string; role?: Role; status?: UserStatus },
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return prisma.user.update({
    where: { id },
    data: payload,
    omit: { password: true },
  });
};

const deleteUser = async (id: string, actingUserId: string) => {
  if (id === actingUserId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You cannot delete your own account.",
    );
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found.");
  }

  return prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
      status: "DELETED",
      deletedAt: new Date(),
    },
    omit: { password: true },
  });
};

export const UserService = { listUsers, updateUser, deleteUser };
