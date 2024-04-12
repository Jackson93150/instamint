export const ProfileBanner = () => {
  return (
    <div className="relative z-10 h-[35vh] w-full">
      <img
        className="size-full object-cover "
        src="https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Fb234b54f-9390-4385-876a-02131b788e3f_1500x500.jpeg"
        alt="banner"
      />
      <span className="tablet:shadow-[inset_0_-40px_300px_100px_rgba(0,0,0,1)] pointer-events-none absolute left-0 top-0 h-[35vh] w-full shadow-[inset_0_-40px_300px_50px_rgba(0,0,0,1)]" />
    </div>
  );
};
