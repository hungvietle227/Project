using AutoMapper;
using BBL.Interfaces;
using DAL.Entities;
using DTO.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Api_ZooManagement_SWP391.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly IReviewService _reviewService;
        private readonly IMapper _mapper;

        public ReviewController(IReviewService reviewService, IMapper mapper)
        {
            _reviewService = reviewService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<ReviewDto>))]
        public IActionResult GetAllReview()
        {
            var review = _mapper.Map<List<ReviewDto>>(_reviewService.GetAllReview());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(review);
        }

        [HttpGet("pages/{page}")]
        [ProducesResponseType(200, Type = typeof(ReviewResponseDto))]
        public IActionResult GetReviewByPage(int page)
        {
            var reviews = _mapper.Map<List<ReviewDto>>(_reviewService.GetAllReview());

            var pageResults = 10f;
            var pageCount = Math.Ceiling(reviews.Count / pageResults);

            var result = reviews
                        .Skip((page - 1) * (int)pageResults)
                        .Take((int)pageResults).ToList();

            var response = new ReviewResponseDto
            {
                Reviews = result,
                CurrentPage = page,
                Pages = (int)pageCount
            };

            if (!ModelState.IsValid)
                return BadRequest();

            return Ok(response);
        }

        [HttpGet("reviewId")]
        [ProducesResponseType(200, Type = typeof(ReviewDto))]
        [ProducesResponseType(400)]
        public IActionResult GetReview(string reviewId)
        {
            if (!_reviewService.ReviewExists(reviewId)) return NotFound();

            var reviews = _mapper.Map<ReviewDto>(_reviewService.GetReview(reviewId));

            if (!ModelState.IsValid) return BadRequest();

            return Ok(reviews);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateReview([FromBody] ReviewCreateDto reviewDto)
        {
            if (reviewDto == null)
            {
                return BadRequest(ModelState);
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int count = _reviewService.GetAllReview().Count + 1;
            var reviewId = "RV" + count.ToString().PadLeft(4, '0');

            var reviewMap = _mapper.Map<Review>(reviewDto);
            reviewMap.ReviewId = reviewId;

            if (!_reviewService.AddReview(reviewMap))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }

            return Ok("Successful Created");
        }

    }
}
