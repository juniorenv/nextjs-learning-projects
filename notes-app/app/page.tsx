"use client";

import AddNoteModal from "@/components/AddNoteModal";
import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import NotesFilter from "@/components/NotesFilter";
import { INote } from "@/types/note";
import { Search } from "lucide-react";
import { nanoid } from "nanoid";
import React, { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);
  const [editingNote, setEditingNote] = useState<INote | null>(null);
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [completionFilter, setCompletionFilter] = useState("all");

  const filteredNotes = useMemo(() => {
    let allNotes = notes;
    const searchQuery = searchText.trim().toLocaleLowerCase();

    if (searchQuery) {
      allNotes = allNotes.filter(
        (note) =>
          note.title.includes(searchQuery) ||
          note.description.includes(searchQuery),
      );
    }

    if (categoryFilter !== "all") {
      allNotes = allNotes.filter((note) => note.category === categoryFilter);
    }

    if (completionFilter !== "all") {
      const completeStatus = completionFilter === "complete" ? true : false;
      allNotes = allNotes.filter(
        ({ isComplete }) => isComplete === completeStatus,
      );
    }

    return allNotes;
  }, [notes, searchText, categoryFilter, completionFilter]);

  const handleAddNote = (formData: INote) => {
    if (editingNote) {
      setNotes((prev) =>
        prev.map((note) => (note.id === formData.id ? formData : note)),
      );
    } else {
      setNotes([...notes, { ...formData, id: nanoid() }]);
    }
    setShowAddNoteModal(false);
    setEditingNote(null);
  };

  const onToggleComplete = (noteId: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === noteId ? { ...note, isComplete: !note.isComplete } : note,
      ),
    );
  };

  const handleEdit = (note: INote) => {
    setShowAddNoteModal(true);
    setEditingNote(note);
  };

  const handleDelete = (noteId: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== noteId));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <>
      <Header
        setShowAddNoteModal={setShowAddNoteModal}
        totalNotes={notes.length}
      />

      <div className="m-auto max-w-6xl">
        <div
          className="
            relative mt-4 w-full overflow-hidden rounded-md border
            border-athens-gray
          "
        >
          <Search
            className="
              absolute top-1/2 left-3 size-4 -translate-y-1/2 text-pale-sky
            "
          />
          <input
            placeholder="Search notes..."
            className="w-full bg-white px-3 py-2 pl-10 text-sm outline-none"
            value={searchText}
            onChange={onChange}
          />
        </div>

        <NotesFilter
          categoryFilter={categoryFilter}
          completionFilter={completionFilter}
          setCategoryFilter={setCategoryFilter}
          setCompletionFilter={setCompletionFilter}
        />
      </div>

      <div className="m-auto max-w-6xl">
        <div
          className="
            mt-4 grid grid-cols-1 gap-4
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onToggleComplete={onToggleComplete}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
      {showAddNoteModal ? (
        <AddNoteModal
          setShowAddNoteModal={setShowAddNoteModal}
          showAddNoteModal={showAddNoteModal}
          handleAddNote={handleAddNote}
          editingNote={editingNote}
          setEditingNote={setEditingNote}
        />
      ) : null}
    </>
  );
}
