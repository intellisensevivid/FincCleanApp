const hasPermission = (requiredPermission) => (req, res, next) => {
  const { user } = req;
  if (
    !user ||
    !user.permissions ||
    !user.permissions.includes(requiredPermission)
  ) {
    return res
      .status(403)
      .json({ error: "You do not have permission to access this." });
  }
  next();
};
