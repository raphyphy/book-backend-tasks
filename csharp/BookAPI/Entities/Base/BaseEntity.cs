using System.ComponentModel.DataAnnotations;

namespace BookAPI.Entities.Base
{
    public class BaseEntity
    {
        [StringLength(36)]
        public string Id { get; set; }
    }
}
