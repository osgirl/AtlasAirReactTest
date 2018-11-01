using AtlasAir.Core.DTO;
using AtlasAir.Core.Services;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AtlasAir.Data.Services
{
    public class CarService : ICarService
    {
        private readonly string jsonFile;
        private List<Car> cars;
        public CarService(string jsonFile)
        {
            this.jsonFile = jsonFile;
        }

        public async Task<List<Car>> Load()
        {
            if (cars == null)
            {
                var json = await File.ReadAllTextAsync(jsonFile);
                return JsonConvert.DeserializeObject<List<Car>>(json);
            }

            return cars;
        }

        public async Task Save()
        {
            var json = JsonConvert.SerializeObject(cars);
            await File.WriteAllTextAsync(jsonFile, json);
        }

        public async Task<Car> CreateAsync(Car car)
        {
            cars = await Load();
            car.Id = cars.Max(c => c.Id) + 1;
            cars.Add(car);
            await Save();
            return car;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            cars = await Load();
            var car = cars.SingleOrDefault(c => c.Id == id);
            if (car == null)
            {
                return false;
            }
            cars.Remove(car);
            await Save();
            return true;
        }

        public async Task<IEnumerable<Car>> GetAsync()
        {
            cars = await Load();
            return cars;
        }

        public async Task<Car> GetAsync(int id)
        {
            cars = await Load();
            return cars.SingleOrDefault(c => c.Id == id);
        }

        public async Task<Car> UpdateAsync(Car car)
        {
            cars = await Load();
            var existingCar = cars.SingleOrDefault(c => c.Id == car.Id);
            if (existingCar == null)
            {
                throw new ArgumentException("Car not found");
            }
            existingCar.Make = car.Make;
            existingCar.Manufacturer = car.Manufacturer;
            existingCar.Model = car.Model;
            existingCar.Year = car.Year;
            await Save();
            return car;
        }
    }
}
