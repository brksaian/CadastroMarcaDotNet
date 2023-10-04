using CadastroMarcas.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CadastroMarcas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public MarcasController(DataContext context)
        {
            _dataContext = context;
        }

        // GET: api/Marcas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Marca>>> GetMarcas(
             int page = 1, // Página atual
             int pageSize = 10 // Tamanho da página padrão
         )
         {
            var marcas = await _dataContext.Marcas
                .Skip((page - 1) * pageSize) // Pule as páginas anteriores
                .Take(pageSize) // Pegue o número de registros igual ao tamanho da página
                .ToListAsync();

            return marcas;
        }

        // Adicione este método ao seu controlador
        [HttpGet("consultar")]
        public async Task<ActionResult<ResultApi>> Consultar(
    string name,
    int atual,
    int pageSize,
    string ativo = "",
    string nacional = ""
)
        {
            var query = _dataContext.Marcas.AsQueryable();

            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(m => EF.Functions.Like(m.Nome, "%" + name + "%"));
            }
            if (!string.IsNullOrEmpty(ativo))
            {
                query = query.Where(m => m.Ativo == ativo);
            }
            if (!string.IsNullOrEmpty(nacional))
            {
                query = query.Where(m => m.Nacional == nacional);
            }

            var totalItens = await query.CountAsync();

            var marcasPaginadas = await query
                .Skip(atual * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var result = new ResultApi
            {
                TotalItens = totalItens,
                Marcas = marcasPaginadas
            };

            return Ok(result); // Retorna 200 OK com o resultado em formato JSON
        }


        // GET api/Marcas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Marca>> GetMarca(int id)
        {
            var marca = await _dataContext.Marcas.FindAsync(id);
            if (marca == null)
            {
                return NotFound();
            }
            return marca;
        }

        // POST api/Marcas
        [HttpPost]
        public async Task<ActionResult<Marca>> Post([FromBody] Marca m)
        {
            if (m == null)
            {
                return BadRequest("Dados da marca inválidos.");
            }
            var marca = await _dataContext.Marcas.FirstOrDefaultAsync(marca => marca.Nome == m.Nome);

            if (marca != null)
            {
                throw new InvalidOperationException("Registro duplicado de marca.");
            }

            _dataContext.Marcas.Add(m);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction("GetMarca", new { id = m.Id }, m);
        }

        // PUT api/Marcas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Marca m)
        {
            if (m == null || id != m.Id)
            {
                return BadRequest("Dados da marca inválidos.");
            }

            var existingMarca = await _dataContext.Marcas.FindAsync(id);
            if (existingMarca == null)
            {
                return NotFound("Marca não encontrada.");
            }

            existingMarca.Nome = m.Nome;
            existingMarca.Ativo = m.Ativo;
            existingMarca.Nacional = m.Nacional;

            try
            {
                await _dataContext.SaveChangesAsync();
                return Ok(existingMarca);
            }
            catch (Exception ex)
            {
                // Trate exceções de atualização do banco de dados, se necessário.
                return StatusCode(500, "Erro interno do servidor ao atualizar a marca.");
            }
        }


        // DELETE api/<ValuesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var marca = await _dataContext.Marcas.FindAsync(id);
            if(marca == null)
            {
                return NotFound();
            }
            _dataContext.Marcas.Remove(marca);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }

        private bool MarcaExists(int id)
        {
            return _dataContext.Marcas.Any(m => m.Id == id);
        }
    }
}
