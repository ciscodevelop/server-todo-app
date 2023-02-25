import Todo from "../mongoModels/todo.model.js";

//Create a new Todo
export const createNewTodo = async (req, res) => {
  const data = { ...req.body };
  const todo = new Todo(data);
  const userId = req.user.id;
  console.log(userId);

  try {
    todo.userId = userId;
    const result = await todo.save();
    res.status(200).json(result);
  } catch (error) {
    
    
     
      res.status(402).json({ message:'Equal Todo',error:{...error.keyValue}});
   
  }
};
//update a single Todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body };
  console.log(data);

  try {
    const todo = await Todo.findByIdAndUpdate(id,data, { new: true });
    res.status(200).json(todo);
  } catch (error) {
    res.status(402).json(error);
  }
};
//Delete a single Todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
 
   
 
  try {
   
    const allTodos = await Todo.findByIdAndDelete({ _id:id });
    res.status(200).json(allTodos);
    
  } catch (error) {
    res.status(403).json({ error: error });
  }
};  
//GET all Todos
export const getAllTodos = async (req, res) => {
  const userId = req?.user?.id;
  //const {id}=req.params.id
  console.log('UserID: '+userId);
  
  try {
   const allTodos=await Todo.find({ userId: [userId] }) 
    
    console.log('id user in Todo: '+allTodos[0].userId);
    if (userId === allTodos[0].userId) {
      
      return res.status(200).json(allTodos);;
      
    } else { 
      return res.status(403).json('Invalid token for this user')
    };
   
    
  } catch (error) {
    res.status(403).json({ error: error });
  }
};
