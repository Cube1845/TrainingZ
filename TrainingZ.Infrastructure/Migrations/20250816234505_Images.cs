using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TrainingZ.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Data = table.Column<byte[]>(type: "bytea", nullable: false),
                    ContentType = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas",
                column: "Code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InvitationDatas_UserId",
                table: "InvitationDatas",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas",
                column: "CoachId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CoachingDatas_StudentId",
                table: "CoachingDatas",
                column: "StudentId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropIndex(
                name: "IX_InvitationDatas_Code",
                table: "InvitationDatas");

            migrationBuilder.DropIndex(
                name: "IX_InvitationDatas_UserId",
                table: "InvitationDatas");

            migrationBuilder.DropIndex(
                name: "IX_CoachingDatas_CoachId",
                table: "CoachingDatas");

            migrationBuilder.DropIndex(
                name: "IX_CoachingDatas_StudentId",
                table: "CoachingDatas");
        }
    }
}
