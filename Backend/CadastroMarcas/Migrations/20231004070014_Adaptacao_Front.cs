using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroMarcas.Migrations
{
    public partial class Adaptacao_Front : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nacionalidade",
                table: "Marcas");

            migrationBuilder.AlterColumn<bool>(
                name: "Ativo",
                table: "Marcas",
                type: "bit",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<bool>(
                name: "Nacional",
                table: "Marcas",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nacional",
                table: "Marcas");

            migrationBuilder.AlterColumn<string>(
                name: "Ativo",
                table: "Marcas",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "Nacionalidade",
                table: "Marcas",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
