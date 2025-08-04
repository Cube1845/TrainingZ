namespace TrainingZ.Domain.Interfaces;

public interface IExtendedAppUser : IAppUser
{
    public string? PhoneNumber { get; set; }
    public string Email { get; set; }
}
