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
        public async Task<ActionResult<IEnumerable<Marca>>> GetMarcas()
        {
            return await _dataContext.Marcas.ToListAsync();
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
        public async Task<ActionResult<Marca>> Post(Marca m)
        {
            if(m == null)
            {
                return BadRequest();
            }

            _dataContext.Marcas.Add(m);
            await _dataContext.SaveChangesAsync();

            return CreatedAtAction("GetMarca", new {id = m.Id}, m);
        }

        // PUT api/Marcas/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Marca m)
        {
            if (m == null)
            {
                return BadRequest();
            }
            if (id == m.Id)
            {
                return BadRequest();
            }

            _dataContext.Entry(m).State = EntityState.Modified;
            try
            {
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if(!MarcaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
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
