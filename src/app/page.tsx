import { PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import NewModal from "./newModal";
import TasksList from "./tasksList";
import { createPBServer } from "@/lib/pb/server";
import { cookies } from "next/headers";

export default async function Home() {
  const pb = createPBServer(cookies());
  //TODO: handle pages
  const data = await pb.collection("tasks").getList(1, 30, {
    sort: "-created",
  });

  return (
    <>
      <main className="flex min-h-screen max-w-4xl mx-auto flex-col p-3">
        <nav className="bg-white border shadow-md p-3 rounded-md flex items-center justify-between">
          <div>
            <span>Total Tasks: {data.totalItems}</span>
          </div>
          <NewModal />
        </nav>
        <TasksList
          currentPage={data.page}
          pages={data.totalPages}
          items={data.items}
        />
      </main>
    </>
  );
}
