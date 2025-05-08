export class CreateUserDto {
    userId: number
    username: string
    password: string
    name: string
    email: string
    roles: string[]
}