"use client";

import { TASKS_COLLECTION } from "@/const";
import { createPBClient } from "@/lib/pb/client";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export default function NewModal({}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentForm = useRef<HTMLFormElement>(null);
  const pb = createPBClient();
  useEffect(() => {
    dialogRef.current?.addEventListener("close", () => {
      contentForm.current?.reset();
    });
  }, []);
  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="btn btn-primary __no_task_to"
      >
        <PlusIcon />
      </button>
      <dialog ref={dialogRef} className="modal">
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            const fd = new FormData(contentForm.current as HTMLFormElement);
            fd.set("owner", pb.authStore.model!.id);
            pb.collection(TASKS_COLLECTION).create(fd);
          }}
          ref={contentForm}
          className="modal-box flex flex-col gap-3"
        >
          <input
            className="font-bold text-2xl"
            defaultValue={"New Task"}
            placeholder="New Task"
            name="title"
          />
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Task Details"
            name="details"
            required
          />
          <div className="modal-action">
            <button
              onClick={() => dialogRef.current?.close()}
              className="btn btn-primary"
            >
              Add
            </button>
            <button form="new_modal_close">Cancel</button>
          </div>
        </form>
        <form id="new_modal_close" method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
