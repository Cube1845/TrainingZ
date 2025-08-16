using Microsoft.AspNetCore.Http;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Application.Common.Interfaces;

public interface IImageService
{
    Task<bool> ImageExists(Guid imageId, CancellationToken ct = default);
    Task<Guid?> AddImage(IFormFile? imageToAdd, CancellationToken ct = default);
    Task<Image?> GetImage(Guid imageId, CancellationToken ct = default);
    Task RemoveImage(Guid imageId, CancellationToken ct = default);
    Task UpdateImageData(Guid imageId, IFormFile? imageFile, CancellationToken ct = default);
}
