using BookAPI.Entities.Base;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace BookAPI.Entities
{
    public class Book : BaseEntity
    {
        public string title { get; set; }
        public string name { get; set; }
        public DateTime year { get; set; }
        [RegularExpression(@"^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$")]
        [DefaultValue("1248752418865")]
        public string isbn { get; set; }
    }

    public class BookDetailDto
    {
        public string title { get; set; }
        public string name { get; set; }
        public DateTime year { get; set; }
        [RegularExpression(@"^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$")]
        [DefaultValue("1248752418865")]
        public string? isbn { get; set; }
    }
}
