// Genera un ID random
const idGenerator = () => {
    return `${Date.now()}${Math.floor(Math.random() * 1000)}`
  }
  
  // Genera una lista de objetos que contendrán las tareas
  const tasks = [
    {
      id: idGenerator(),
      name: 'Tarea 1',
      completed: false
    },
    {
      id: idGenerator(),
      name: 'Tarea 2',
      completed: true
    },
    {
      id: idGenerator(),
      name: 'Tarea 3',
      completed: true
    }
    ,
    {
      id: idGenerator(),
      name: 'Tarea 3',
      completed: false
    }
  ]
  
  // Captura los elementos del DOM
  const inputTaskContainer = document.querySelector('#add-task-container')
  const inputTask = document.querySelector('#task')
  const btnAddTask = document.querySelector('#add')
  const toDoList = document.querySelector('#todo-list')
  const totalTasks = document.querySelector('#total')
  const completedTasks = document.querySelector('#completed')
  
  // Genera el render para la lista
  const renderToDoList = (taskList) => {
    taskList.forEach((task) => {
      const { id, name, completed } = task
      const btnBgCompleted = `${completed ? 'bg-yellow-500 hover:bg-yellow-400' : 'bg-gray-700 hover:bg-gray-500'}`
      const liBgCompleted = `${completed ? 'bg-gray-200' : ''}`
      const btnText = `${completed ? 'Dejar pendiente' : 'Completar'}`
  
      const li = document.createElement('li')
      li.className = `border border-gray-300 p-2 mt-2 flex justify-between ${liBgCompleted}`
      li.innerHTML = `<span><strong>ID: ${id}</strong> - ${name}</span>
                      <div id="actions" class="flex justify-end gap-2">
                          <button class="${btnBgCompleted} text-white py-1 px-2 rounded">${btnText}</button>
                          <button class="bg-red-500 text-white py-1 px-2 hover:bg-red-400 rounded">Eliminar</button>
                      </div>`
      toDoList.appendChild(li)
    })
  
    totalTasks.textContent = taskList.length
    completedTasks.textContent = taskList.filter(task => task.completed).length
    inputTask.value = ''
  }
  
  // Variable que permite agregar una tarea a la lista
  const addTask = () => {
    if (inputTask.value === '') {
      const info = document.createElement('p')
      info.textContent = 'Debes ingresar una tarea'
      info.className = 'mx-auto text-red-500 mt-2 transition-all duration-500'
      inputTaskContainer.appendChild(info)
      setTimeout(() => {
        info.classList.add('opacity-0')
        setTimeout(() => {
          info.remove()
        }, 500)
      }, 500)
      return
    }
  
    const task = {
      id: idGenerator(),
      name: inputTask.value,
      completed: false
    }
  
    tasks.push(task)
    toDoList.innerHTML = ''
    renderToDoList(tasks)
  }
  
  // Completa la tarea seleccionada
  const completeTask = (id) => {
    const task = tasks.find(task => task.id === id)
  
    task.completed = !task.completed
    toDoList.innerHTML = ''
    renderToDoList(tasks)
  }
  
  // Elimina la tarea seleccionada
  const deleteTask = (id) => {
    const index = tasks.findIndex(task => task.id === id)
  
    tasks.splice(index, 1)
    toDoList.innerHTML = ''
    renderToDoList(tasks)
  }
  
  // Agrega una tarea al clickear el botón
  btnAddTask.addEventListener('click', addTask)
  
  // Permite completar una tarea / dejarla pendiente al clickear el botón
  toDoList.addEventListener('click', (e) => {
    const target = e.target
    const parent = target.parentElement.parentElement
    const id = parent.querySelector('strong').textContent.split(' ')[1]
  
    if (target.textContent === 'Completar' || target.textContent === 'Dejar pendiente') {
      completeTask(id)
    }
  
    if (target.textContent === 'Eliminar') {
      deleteTask(id)
    }
  
  })
  
  // Renderiza la lista en pantalla
  renderToDoList(tasks)
  