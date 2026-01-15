using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TrainingZ.Application.Common.Interfaces;
using TrainingZ.Application.Common.Models;

namespace TrainingZ.Infrastructure.Persistence.Images;

public class ImageService(AppDbContext context, TimeProvider time) : IImageService
{
    private readonly AppDbContext _context = context;
    private readonly TimeProvider _time = time;

    public async Task<bool> ImageExists(Guid imageId, CancellationToken ct)
    {
        return await _context.Images.AnyAsync(x => x.Id == imageId, ct);
    }

    public async Task<Guid> AddImage(IFormFile imageFile, CancellationToken ct)
    {
        var image = await ToImageDb(imageFile, ct);

        await _context.Images.AddAsync(image, ct);
        await _context.SaveChangesAsync(ct);

        return image.Id;
    }

    public async Task<Image?> GetImage(Guid imageId, CancellationToken ct)
    {
        return await _context.Images.FindAsync([imageId], ct);
    }

    public async Task RemoveImage(Guid imageId, CancellationToken ct)
    {
        await _context.Images
            .Where(x => x.Id == imageId)
            .ExecuteDeleteAsync(ct);
    }

    public async Task UpdateImageData(Guid imageId, IFormFile? imageFile, CancellationToken ct)
    {
        if (imageFile is null)
        {
            return;
        }

        var image = await ToImageDb(imageFile, ct);

        await _context.Images
            .Where(x => x.Id == imageId)
            .ExecuteUpdateAsync(x => x
                .SetProperty(p => p.Data, image.Data)
                .SetProperty(p => p.ContentType, image.ContentType)
            , ct);
    }

    private async Task<Image> ToImageDb(IFormFile imageFile, CancellationToken ct)
    {
        using MemoryStream memoryStream = new();
        await imageFile.CopyToAsync(memoryStream, ct);

        Image image = new(memoryStream.ToArray(), imageFile.ContentType, _time.GetUtcNow().LocalDateTime.ToUniversalTime());

        return image;
    }
}
