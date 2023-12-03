namespace DTO.Dtos
{
    public enum Role
    {
        ADMIN = 1,
        STAFF = 2,
        ZOOTRAINER = 3,
        INVALID = -1
    }

    public static class UserRoleExtensions
    {
        public static Role ValueOf(int role)
        {
            if (role < 0 || role >= Enum.GetValues(typeof(Role)).Length)
            {
                return Role.INVALID;
            }
            return (Role)role;
        }

        public static int ToIntValue(this Role userRole)
        {
            return (int)userRole;
        }
    }

}
