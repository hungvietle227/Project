using DTO.Dtos;
using AutoMapper;
using BBL.Interfaces;
using DAL.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsService _newsService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public NewsController(INewsService newsService,
                              IUserService userService,
                              IMapper mapper)
        {
            _newsService = newsService;
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet("{userId}/pages/{page}")]
        [ProducesResponseType(200, Type = typeof(NewsResponseDto))]
        public IActionResult GetNewsOfStaff(string userId, int page)
        {
            if (userId == null || !_userService.UserExists(userId))
                return NotFound("Staff is not found");

            var news = _newsService.GetNewsByStaffId(userId).ToList();
            var allNews = _mapper.Map<List<NewsDto>>(news);
            if (news.Count > 0)
            {
                for (int index = 0; index < allNews.Count; index++)
                {
                    var user = _userService.GetById(news[index].UserId);

                    allNews[index].AuthorName = user.Firstname + " " + user.Lastname;
                }
            }

            var pageResults = 5f;
            var pageCount = Math.Ceiling(news.Count / pageResults);

            var result = allNews
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new NewsResponseDto
            {
                News = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("accepted")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<NewsDto>))]
        public IActionResult GetAcceptedNews()
        {
            var news = _newsService.GetAcceptedNews().ToList();
            var allNews = _mapper.Map<List<NewsDto>>(news);
            if (news.Count > 0)
            {
                for (int index = 0; index < allNews.Count; index++)
                {
                    var user = _userService.GetById(news[index].UserId);

                    allNews[index].AuthorName = user.Firstname + " " + user.Lastname;
                }
            }

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(allNews);
        }

        [HttpGet("denied")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<NewsDto>))]
        public IActionResult GetDeniedNews()
        {
            var news = _newsService.GetDeniedNews().ToList();
            var allNews = _mapper.Map<List<NewsDto>>(news);
            if (news.Count > 0)
            {
                for (int index = 0; index < allNews.Count; index++)
                {
                    var user = _userService.GetById(news[index].UserId);

                    allNews[index].AuthorName = user.Firstname + " " + user.Lastname;
                }
            }

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(allNews);
        }

        [HttpGet()]
        [ProducesResponseType(200, Type = typeof(IEnumerable<NewsDto>))]
        public IActionResult GetAllNews()
        {
            var news = _newsService.GetAllNews().ToList();
            var allNews = _mapper.Map<List<NewsDto>>(news);
            if (news.Count > 0)
            {
                for (int index = 0; index < allNews.Count; index++)
                {
                    var user = _userService.GetById(news[index].UserId);

                    allNews[index].AuthorName = user.Firstname + " " + user.Lastname;
                }
            }

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(allNews);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(NewsResponseDto))]
        public IActionResult GetNewsByPage(int page)
        {
            var news = _newsService.GetAllNews().ToList();
            var allNews = _mapper.Map<List<NewsDto>>(news);

            for (int index = 0; index < allNews.Count; index++)
            {
                var user = _userService.GetById(news[index].UserId);

                allNews[index].AuthorName = user.Firstname + " " + user.Lastname;
            }

            var pageResults = 10f;
            var pageCount = Math.Ceiling(news.Count / pageResults);

            var result = allNews
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new NewsResponseDto
            {
                News = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("{newsId}")]
        [ProducesResponseType(200, Type = typeof(NewsDto))]
        [ProducesResponseType(400)]
        public IActionResult GetNews(string newsId)
        {
            if (!_newsService.NewsExists(newsId)) return NotFound();
            var news = _newsService.GetNews(newsId);
            var newsDto = _mapper.Map<NewsDto>(news);
            var user = _userService.GetById(news.UserId);

            newsDto.AuthorName = user.Firstname + " " + user.Lastname;
            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(newsDto);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult CreateNews([FromQuery] string userId, [FromBody] NewsCreateDto newsCreate)
        {
            if(!_userService.UserExists(userId))
                return BadRequest("staff doesn't not exist!!");

            if (newsCreate == null)
            {
                return BadRequest(ModelState);
            }

            if (userId.StartsWith('Z'))
                return BadRequest("Just staff can create news");

            int count = _newsService.GetAllNews().Count + 1;
            var newsId = "NW" + count.ToString().PadLeft(4, '0');

            var newsMap = _mapper.Map<News>(newsCreate);
            newsMap.User = _userService.GetById(userId);
            newsMap.NewsId = newsId;
            newsMap.ReleaseDate = DateTime.Now;
            newsMap.Status = true;
            newsMap.Checked = false;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_newsService.AddNews(newsMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successful Created");
        }

        [HttpPut("{newsId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        //[Authorize(Roles = "STAFF")]
        public IActionResult UpdateNews(string newsId, [FromBody] NewsUpdateDto newsUpdate)
        {
            if (newsUpdate == null)
                return BadRequest(ModelState);

            if (newsId != newsUpdate.NewsId)
                return BadRequest(ModelState);

            if (!_newsService.NewsExists(newsId))
                return NotFound();

            var newsMap = _mapper.Map<News>(newsUpdate);

            if (!ModelState.IsValid)
                return BadRequest();

            if (!_newsService.UpdateNews(newsMap))
            {
                ModelState.AddModelError("", "Error when updating food!!");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpDelete("{newsId}")]
        [ProducesResponseType(400)]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public IActionResult DeleteNews(string newsId)
        {
            if (!_newsService.NewsExists(newsId))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_newsService.DeleteNews(newsId))
            {
                ModelState.AddModelError("", "Something went wrong while deleting food");
            }

            return NoContent();
        }
    }
}
