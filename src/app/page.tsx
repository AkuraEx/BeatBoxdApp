import Image from "next/image";

export default function Home() {
  return (
    <div>
          <div className="mydict">
      <div>
        <label>
          <input type="radio" name="radio" />
          <span>Sign In</span>
        </label>
        <label>
          <input type="radio" name="radio" />
          <span>Create An Account</span>
        </label>
        <label>
          <input type="radio" name="radio" />
          <span>Albums</span>
        </label>
      
	</div>
</div>
      <p>WORDS</p>
      <p>fdsa</p>
      <p>asdf</p>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>Words</p>
      </main>
    </div>
  );
}
