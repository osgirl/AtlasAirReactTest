using AtlasAir.Core.DTO;
using AtlasAir.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AtlasAir.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly ICarService carService;

        public CarsController(ICarService carSvc)
        {
            carService = carSvc;
        }

        // GET api/cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> Get()
        {
            return Ok(await carService.GetAsync());
        }

        // GET api/cars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(int id)
        {
            return Ok(await carService.GetAsync(id));
        }

        // POST api/cars
        [HttpPost]
        public async Task<ActionResult<Car>> Post([FromBody] Car car)
        {
            car = await carService.CreateAsync(car);
            return Created($"api/cars/{car.Id}", car);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Car>> Put(int id, [FromBody] Car car)
        {
            car = await carService.UpdateAsync(car);
            return Ok(car);
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await carService.DeleteAsync(id);
            return deleted ? (IActionResult)NoContent() : NotFound();
        }
    }
}
