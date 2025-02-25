
const TaskCard = ({ item }) => {
   return (
      <div>
         <h3>{item.title}</h3>
         <p>{item.description}</p>
         <p>{item.dueDate}</p>
         <button className="primary-btn">Edit</button>
         <button className="secondary-btn">Delete</button>
      </div>
   );
};

export default TaskCard;
