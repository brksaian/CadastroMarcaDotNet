using System.ComponentModel.DataAnnotations;

namespace CadastroMarcas
{
    public class Marca
    {
        public int Id { get; set; }
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;
        [StringLength(100)]
        public string Ativo { get; set; } = "Ativo";
        public string Nacionalidade { get; set; } = string.Empty;
    }
}
