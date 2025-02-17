const Layout = ({ children }) => {
  return (
    <div className="w-full min-h-[100vh] flex justify-center items-start ">
      {children}
    </div>
  );
};

export default Layout;
