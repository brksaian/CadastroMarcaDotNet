using System.ComponentModel.DataAnnotations;

namespace CadastroMarcas
{
    public class Marca
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Ativo { get; set; }
        public string Nacional { get; set; }
    }
}
