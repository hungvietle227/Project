namespace DTO.Dtos
{
    public class NewsUpdateDto
    {
        public string NewsId { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public string? NewsImage { get; set; }
        public bool Status { get; set; }
        public bool Checked { get; set; }
    }
}

