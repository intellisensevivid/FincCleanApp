const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-center">FinCleanApp</h1>
      <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
