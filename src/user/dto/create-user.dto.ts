import { Role } from "@src/auth/decorators/role.enum"

export class CreateUserDto {
    userId: number
    username: string
    password: string
    name: string
    email: string
    roles: Role[]
}