function CarController() {
    // var searchElem = document.getElementById('search-query')
    // var resultsElem = document.getElementById('results-here')
    // var appElem = document.getElementById('app')
    // var detailsElem = document.getElementById('details-here')


    // searchElem.addEventListener('change', function(event){
    //     resultsElem.classList.add('hidden')
    //     var query = event.target.value
    //     carService.getData(query, draw)
    // })

    var carsElem = document.getElementById('cars-here')
    var carService = new CarService()

    function getCars() {
        carService.getCars(draw)
    }

    this.makeCar = function(event) {
        event.preventDefault()
        var form = event.target
        carService.makeCar(form, draw)
        form.reset()
    }

    this.removeCar = function removeCar(id) {
        carService.removeCar(id, draw)
    }

    this.showEditCarForm = function showEditCarForm(id) {
        var form = document.getElementById('edit-' + id)
        form.classList.remove('hidden')
    }

    this.editCar = function editCar(event) {
        event.preventDefault()
        debugger
        carService.editCar(event.target, draw)
    }

    function draw(cars) {
        var template = ''
        if (cars == undefined) {
            carsElem.innerHTML = '<h3>Sorry.... no listings at this time check back soon.</h3>'
            return
        } else if (cars.length < 1) {
            carsElem.innerHTML = '<h3>Sorry.... no listings at this time check back soon.</h3>'
            return
        }
        cars.forEach(car => {
            template += `
        
            <div class="card p-1 flex space-between">
                <div class="details">
                    <p>${car.year} - ${car.make} - ${car.model} - ${car.color} - ${car.price}</p>
                    <li> onclick="app.controllers.carCtrl.showEditCarForm('${car.id}')" class="action fa fa-fw fa-lg fa-pencil text-blue">Edit</li>
                    <li onclick="app.controllers.carCtrl.removeCar('${car.id}')" class="action fa fa-fw fa-lg fa-trash text-red">Remove</li>
                </div>
                <form id="edit-${car.id}" class="hidden" onsubmit="app.controllers.carCtrl.editCar(event)">
				<div class="form-group hidden">
					<label for="id">id:</label>
					<input type="text" name="id" class="form-control" required value="${car.id}" readonly>
				</div>
                <div class="form-group">
					<label for="make">Make:</label>
					<input type="text" name="make" class="form-control" value="${car.make}" required>
				</div>
				<div class="form-group">
					<label for="model">Model:</label>
					<input type="text" name="model" class="form-control" value="${car.model}" required>
				</div>
				<div class="form-group">
					<label for="year">Year:</label>
					<input type="text" name="year" class="form-control" value="${car.year}" required>
				</div>
				<div class="form-group">
					<label for="color">color:</label>
					<input type="text" name="color" class="form-control" value="${car.color}">
				</div>
				<div class="form-group">
					<label for="price">Price:</label>
					<input type="text" name="price" class="form-control" value="${car.price}" required>
				</div>
				<div class="form-group">
					<button type="submit" class="btn btn-success">Update Car</button>
					<button type="reset" class="btn btn-danger red">Clear</button>
				</div>
			</form>
            </div>
            `
        })

        carsElem.innerHTML = template
    }

    function hideOtherForms() {
        document.getElementById("fruit").style.visibility = "hidden"
        document.getElementById("animals").style.visibility = "hidden"

        document.getElementById("autos").style.visibility = "visible"
    }

    this.goAutos = function goAutos() {
        hideOtherForms()
        getCars()
    }

    // hideOtherForms()

    //FOR FRUIT
    // function hideOtherForms() {
    //     document.getElementById("autos").style.visibility = "hidden"
    //     document.getElementById("animals").style.visibility = "hidden"

    //     document.getElementById("fruit").style.visibility = "visible"

    // }

    // this.goFruit = function goFruit() {
    //     hideOtherForms()
    //     draw()
    // }

    //FOR ANIMALS

    // function hideOtherForms() {
    //     document.getElementById("autos").style.visibility = "hidden"
    //     document.getElementById("fruit").style.visibility = "hidden"

    //     document.getElementById("animals").style.visibility = "visible"

    // }

    // this.goAnimals = function goAnimals() {
    //     hideOtherForms()
    //     draw()
    // }

    getCars()

}