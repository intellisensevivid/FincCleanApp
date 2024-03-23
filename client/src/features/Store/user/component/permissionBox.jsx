function PermissionBox({ title, onchange }) {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center input bg-gray-300">
        <p className="text-sm">{title}</p>
        <input
          type="checkbox"
          name="check"
          id={title}
          onChange={onchange}
          className="bg-white text-white"
        />
      </div>
    </div>
  );
}

export default PermissionBox;
