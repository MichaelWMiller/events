function FruitController() {
    var fruitService = new FruitService()

    var fruitsElem = document.getElementById('fruits-here')

    function getFruit() {
        fruitService.getFruit(draw)
    }

    this.makeFruit = function(event) {
        event.preventDefault()
        var form = event.target
        fruitService.makeFruit(form, draw)
        form.reset()
    }

    this.removeFruit = function removeFruit(id) {
        fruitService.removeFruit(id, draw)
    }

    this.showEditFruitForm = function showEditFruitForm(id) {
        var form = document.getElementById('edit-' + id)
        form.classList.remove('hidden')
    }

    this.editFruit = function editFruit(event) {
        event.preventDefault()
        fruitService.editFruit(event.target, draw)
    }

    function draw(fruits) {
        var template = ``
        if (fruits == undefined) {
            fruitsElem.innerHTML = '<h4> Sorry... It\'s Fruitless!</h4>'
            return
        } else if (fruits.length < 1) {
            fruitsElem.innerHTML = '<h4> Sorry... It\'s Fruitless!</h4>'
            return
        }
        fruits.forEach(fruit => {
            template += `  
        <div class="card p-1 flex space-between">
            <div class="details">
                <p>${fruit.name} - ${fruit.color} - ${fruit.size} - ${fruit.tang}</p>
                <li onclick="app.controllers.fruitCtrl.showEditFruitForm('${fruit.id}')" class="action fa fa-fw fa-lg fa-pencil text-blue">Edit</li>
                <li onclick="app.controllers.fruitCtrl.removeFruit('${fruit.id}')" class="action fa fa-fw fa-lg fa-trash text-red">Remove</li>
            </div>
            <form id="edit-${fruit.id}" class="hidden" onsubmit="app.controllers.fruitCtrl.editFruit(event)">
            <div class="form-group hidden">
                <label for="id">id:</label>
                <input type="text" name="id" class="form-control" required value="${fruit.id}" readonly>
            </div>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" name="name" class="form-control" value="${fruit.name}" required>
            </div>
            <div class="form-group">
                <label for="color">Color:</label>
                <input type="text" name="color" class="form-control" value="${fruit.color}" required>
            </div>
            <div class="form-group">
                <label for="size">Size:</label>
                <input type="text" name="size" class="form-control" value="${fruit.size}" required>
            </div>
            <div class="form-group">
                <label for="tang">Tang:</label>
                <input type="text" name="tang" class="form-control" value="${fruit.tang}">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-success">Update Fruit</button>
                <button type="reset" class="btn btn-danger red">Clear</button>
            </div>
        </form>
        </div>        
        `
        })
        fruitsElem.innerHTML = template
    }



    function hideOtherForms() {
        document.getElementById("autos").style.visibility = "hidden"
        document.getElementById("animals").style.visibility = "hidden"

        document.getElementById("fruit").style.visibility = "visible"

    }

    this.goFruit = function goFruit() {
        hideOtherForms()
        draw()
    }

    getFruit()
}