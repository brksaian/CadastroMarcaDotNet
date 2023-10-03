using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CadastroMarcas.Migrations
{
    public partial class DB1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_MarcaTipos",
                table: "MarcaTipos");

            migrationBuilder.RenameTable(
                name: "MarcaTipos",
                newName: "Marcas");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Marcas",
                table: "Marcas",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Marcas",
                table: "Marcas");

            migrationBuilder.RenameTable(
                name: "Marcas",
                newName: "MarcaTipos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_MarcaTipos",
                table: "MarcaTipos",
                column: "Id");
        }
    }
}
