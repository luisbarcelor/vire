namespace Vire.ApiServer.Application.Users;

public record UserDto(Guid Id, string Name, string LastName, string Username);

public record CreateUserRequest(string Name, string LastName, string Username);

public record UpdateUserRequest(string Name, string LastName);
