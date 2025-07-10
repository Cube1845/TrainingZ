using Microsoft.Extensions.Options;

namespace TrainingZ.Infrastructure.Auth.Config;

public class TokenConfiguration(IOptions<TokenOptions> tokenOptions)
{
    private readonly TokenOptions _tokenOptions = tokenOptions.Value;

    public TokenOptions GetTokenConfiguration()
    {
        return _tokenOptions;
    }
}
