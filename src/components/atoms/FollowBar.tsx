const FollowBar = () => {
  return (
    <section className="px-6 py-4 hidden lg:block">
      <div className="border border-neutral-800 rounded-xl px-4 py-3">
        <span className="text-white font-semibold text-lg">Who to follow</span>

        <div className="flex flex-col gap-6 mt-6">{/* TODO: USER LIST */}</div>
      </div>
    </section>
  );
};

export default FollowBar;
