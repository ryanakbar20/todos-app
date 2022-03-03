import { Button, Card, Header, Modal } from "../../components";
import { useState, useEffect } from "react";
import { useFetchListQuery } from "../../config/features/todos/api-slice";
import { useAppDispatch, useAppSelector } from "../../config/app/hooks";
import {
  setList,
  addList,
  deleteList,
  editList,
  checkList,
} from "../../config/features/todos/todos-slice";
import moment from "moment";

interface DataTypes {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

export default function Home() {
  const dispatch = useAppDispatch();
  const listTodos = useAppSelector((state) => state.todos.list);
  const [isModal, setIsModal] = useState(false);

  //payload
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<number>(0);
  const [createdAt, setCreatedAt] = useState<string>("");

  const { data = [] } = useFetchListQuery();

  useEffect(() => {
    dispatch(setList(data));
  }, [data, dispatch]);

  function handleChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function handleChangeDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value);
  }

  function clearState() {
    setId(0);
    setTitle("");
    setDescription("");
    setStatus(0);
    setCreatedAt("");
  }

  function toggleModal() {
    setIsModal(!isModal);
  }

  function showModalEdit(item: DataTypes) {
    setId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
    setCreatedAt(item.createdAt);
    setIsEdit(true);
    toggleModal();
  }

  function handleAddTodo() {
    dispatch(
      addList({
        id: new Date().getTime(),
        title: title,
        description: description,
        status: 0,
        createdAt: moment().format("YYYY-MM-DD HH:mm"),
      })
    );
    clearState();
    toggleModal();
  }

  function handleDeleteTodo(id: number) {
    dispatch(deleteList(id));
  }

  function handleEditTodo() {
    dispatch(
      editList({
        id: id,
        title: title,
        description: description,
        status: status,
        createdAt: createdAt,
      })
    );
    clearState();
    toggleModal();
  }

  function handleCheckTodo(item: DataTypes) {
    dispatch(checkList({ id: item.id, status: item.status === 1 ? 0 : 1 }));
  }

  function sortAsc(datasets: DataTypes[]) {
    const newData = [...datasets];
    return newData.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  function sortDesc(datasets: DataTypes[]) {
    const newData = [...datasets];
    return newData.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return (
    <>
      <Header />
      <div className="container px-2 mx-auto">
        <div className="mb-4">
          <Button
            type="primary"
            onClick={() => {
              setIsEdit(false);
              toggleModal();
            }}
          >
            Add New Task
          </Button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-indigo-800 dark:bg-teal-800 rounded-md p-4">
            <h2 className="text-xl font-semibold text-indigo-100 text-center font-mono mb-4">
              Uncompleted
            </h2>
            <div className="flex flex-col space-y-4">
              {sortAsc(listTodos).map((item, index) => {
                return (
                  item.status !== 1 && (
                    <Card
                      key={index}
                      dataSource={item}
                      onDelete={() => handleDeleteTodo(item.id)}
                      onEdit={() => showModalEdit(item)}
                      onCheck={() => handleCheckTodo(item)}
                    />
                  )
                );
              })}
            </div>
          </div>
          <div className="bg-indigo-800 dark:bg-teal-800 rounded-md p-4">
            <h2 className="text-xl font-semibold text-indigo-100 text-center font-mono mb-4">
              Completed
            </h2>
            <div className="flex flex-col space-y-4">
              {sortDesc(listTodos).map((item, index) => {
                return (
                  item.status === 1 && (
                    <Card
                      key={index}
                      dataSource={item}
                      onDelete={() => handleDeleteTodo(item.id)}
                      onEdit={() => showModalEdit(item)}
                      onCheck={() => handleCheckTodo(item)}
                    />
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={isModal}
        onCancel={() => {
          clearState();
          toggleModal();
        }}
      >
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="font-mono text-lg font-medium leading-6 text-gray-900">
                Task
              </label>
              <input
                className="font-mono ring-2 ring-gray-500 rounded-md px-2 text-lg font-medium text-gray-900"
                name="title"
                value={title}
                onChange={handleChangeTitle}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-mono text-sm text-gray-500">
                Description
              </label>
              <textarea
                rows={3}
                className="font-mono ring-2 ring-gray-500 rounded-md px-2 text-sm text-gray-500"
                name="description"
                value={description}
                onChange={handleChangeDescription}
              />
            </div>
          </div>

          {isEdit && (
            <div className="flex flex-col space-y-2 mt-2">
              <small className="text-xs font-thin text-indigo-800 font-mono">
                created At : {createdAt}
              </small>
              <small className="text-xs font-thin text-indigo-800 font-mono">
                Status : {status === 1 ? "Completed" : "Uncompleted"}
              </small>
            </div>
          )}

          <div className="mt-4 flex flex-row space-x-2">
            <Button type="secondary" onClick={toggleModal}>
              Cancel
            </Button>
            {isEdit ? (
              <Button type="primary" onClick={handleEditTodo}>
                Edit
              </Button>
            ) : (
              <Button type="primary" onClick={handleAddTodo}>
                Save
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
