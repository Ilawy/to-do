"use client";
import { TASKS_COLLECTION } from "@/const";
import { createPBClient } from "@/lib/pb/client";
import { TodoTasksResponse } from "@/types/pocketbase-types";
import { Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function TasksList({
  currentPage,
  pages,
  items,
}: {
  currentPage: number;
  pages: number;
  items: TodoTasksResponse[];
}) {
  const [usableItems, setUsableItems] = useState(items);
  const pb = createPBClient();
  const deleteTask = async (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      await pb.collection(TASKS_COLLECTION).delete(id);
    }
  };
  useEffect(() => {
    const unsub = pb
      .collection(TASKS_COLLECTION)
      .subscribe("*", async (update) => {
        // // create, update, delete
        // if (update.action === "create") {
        //   setUsableItems([update.record, ...usableItems]);
        // }
        // if (update.action === "update") {
        //   setUsableItems(
        //     usableItems.map((x) =>
        //       x.id === update.record.id ? update.record : x
        //     )
        //   );
        // }
        // if (update.action === "delete") {
        //   setUsableItems(usableItems.filter((x) => x.id !== update.record.id));
        // }

        //? instead of updating, just fetch new data

        const newItems = await pb
          .collection(TASKS_COLLECTION)
          .getFullList<TodoTasksResponse>({
            sort: "-created",
            $autoCancel: false,
            page: currentPage,
            perPage: 10,
          });
        setUsableItems(newItems);
      });
    return () => {
      console.log("destroy");
    };
  }, [usableItems]);
  if (items.length > 0)
    return (
      <section className="flex flex-col gap-3 my-5">
        {usableItems.map((item) => (
          <div
            key={item.id}
            className="bg-white text-black p-3 rounded-lg grid grid-cols-3 grid-rows-3 gap-3"
          >
            <h3 className="font-bold text-2xl col-span-2">{item.title}</h3>
            <p className="col-span-3 row-span-3">{item.details}</p>
            <div className="row-span-1 col-span-full flex items-center justify-center gap-3">
              <button
                onClick={() => deleteTask(item.id)}
                className="btn btn-error btn-outline flex-1"
              >
                <Trash2Icon />
              </button>
            </div>
          </div>
        ))}
      </section>
    );
  else {
    return (
      <section className="flex flex-col justify-center items-center gap-3 my-5">
        <h1 className="font-bold text-2xl __no_task_from">No Tasks Yet</h1>
      </section>
    );
  }
}
