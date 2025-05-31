"use client";

import { useState } from "react";
import ChatWindow from "@/components/chatWindow";
import { FileUpload } from "@/components/fileUpload";
import { auth } from "../../../firebaseConfig";

export default async function Home() {
  // Lifted state holding the array of filenames from the backend
  const [filenames, setFilenames] = useState([]);
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated!");
  const idToken = await user.getIdToken();

  return (
    <main className="flex min-h-screen flex-col space-y-4 bg-gray-800 p-4 md:flex-row md:space-x-4 md:space-y-0">
      {/* Upload Section */}
      <section className="flex rounded-lg bg-black shadow md:w-1/3">
        {/* Pass setFilenames as the onChange handler */}
        <FileUpload onChange={setFilenames} idToken={idToken} />
      </section>

      {/* Chat Section */}
      <section className="flex flex-1 flex-col rounded-lg bg-black p-4 shadow">
        {/* hasDocs is true if there’s at least one filename */}
        <ChatWindow hasDocs={filenames.length > 0} idToken={idToken} />
      </section>
    </main>
  );
}
