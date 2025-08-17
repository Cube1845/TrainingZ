using Microsoft.AspNetCore.Http;

namespace TrainingZ.Application.Modules.User.Update.ProfileImage;

public record UpdateProfileImageRequest(IFormFile? ImageFile);