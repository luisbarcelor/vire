using Vire.ApiServer.Domain.Users;

namespace Vire.ApiServer.Application.Users;

public class UserService(IUserRepository userRepository) : IUserService
{
    public async Task<IEnumerable<UserDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var users = await userRepository.GetAllAsync(cancellationToken);
        return users.Select(u => new UserDto(u.Id, u.Name, u.LastName, u.Username));
    }

    public async Task<UserDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByIdAsync(id, cancellationToken);
        return user == null ? null : new UserDto(user.Id, user.Name, user.LastName, user.Username);
    }

    public async Task<UserDto> CreateAsync(CreateUserRequest request, CancellationToken cancellationToken = default)
    {
        var existingUser = await userRepository.GetByUsernameAsync(request.Username, cancellationToken);
        if (existingUser != null)
        {
            throw new Exception("Username already exists"); // Basic error handling as requested
        }

        var user = new User(request.Name, request.LastName, request.Username);
        await userRepository.AddAsync(user, cancellationToken);
        await userRepository.SaveChangesAsync(cancellationToken);

        return new UserDto(user.Id, user.Name, user.LastName, user.Username);
    }

    public async Task UpdateAsync(Guid id, UpdateUserRequest request, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByIdAsync(id, cancellationToken);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.Name = request.Name;
        user.LastName = request.LastName;
        
        userRepository.Update(user);
        await userRepository.SaveChangesAsync(cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var user = await userRepository.GetByIdAsync(id, cancellationToken);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        userRepository.Delete(user);
        await userRepository.SaveChangesAsync(cancellationToken);
    }
}
