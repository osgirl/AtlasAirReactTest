using AtlasAir.Core.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AtlasAir.Core.Services
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetAsync();
        Task<Car> GetAsync(int id);
        Task<Car> CreateAsync(Car car);
        Task<Car> UpdateAsync(Car car);
        Task<bool> DeleteAsync(int id);
    }
}
