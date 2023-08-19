export interface CreateUserDto {
    username: string;
    birthdate: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> { }