using TrainingZ.Domain.Abstract;

namespace TrainingZ.Application.Common.Models;

public class Image : BaseEntity
{
    public Image(byte[] data, string contentType, DateTime createdAt)
    {
        Data = data;
        CreatedAt = createdAt;
        ContentType = contentType;
    }

    public byte[] Data { get; set; }
    public string ContentType { get; set; }
}
