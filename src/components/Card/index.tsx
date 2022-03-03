import { Button } from "..";

interface DataTypes {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  status: number;
}

interface CardProps {
  dataSource: DataTypes;
  onDelete(): void;
  onEdit(): void;
  onCheck(): void;
}

export default function Card(props: CardProps) {
  const { title, description, createdAt, status } = props.dataSource;
  return (
    <div className="flex flex-col bg-indigo-700 dark:bg-teal-700 rounded-md p-4 cursor-pointer hover:-translate-y-1 duration-500">
      <div className="flex flex-row justify-between">
        <div>
          <h3 className="text-lg font-semibold text-indigo-100 font-mono">
            {title}
          </h3>
          <p className="text-base font-medium text-indigo-100 font-mono mb-4">
            {description}
          </p>
          <small className="text-xs font-thin text-indigo-100 font-mono">
            created At : {createdAt}
          </small>
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex justify-end space-x-2">
            <label className="text-indigo-100 font-mono">Status :</label>
            <input
              className="w-6 h-6 cursor-pointer"
              type="checkbox"
              checked={status === 1}
              onChange={props.onCheck}
            />
          </div>
          <div>
            {status !== 1 && (
              <Button type="danger" className="mr-2" onClick={props.onDelete}>
                Delete
              </Button>
            )}
            <Button type="secondary" onClick={props.onEdit}>
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
