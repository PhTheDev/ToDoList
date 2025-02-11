import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { TodoList } from "@/components/TodoList";

export default function TodoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow bg-gradient-to-b from-zinc-900 to-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <TodoList />
        </div>
      </main>
      <Footer />
    </div>
  );
}
