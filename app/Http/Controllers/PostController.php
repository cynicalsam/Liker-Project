<?php

namespace App\Http\Controllers;

use App\Events\PostCreated;
use App\Models\Like;
use App\Models\Post;
use App\Transformers\PostTransformer;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct()
    {
        return $this->middleware(['auth']);
    }

    public function index()
    {
        $posts = Post::latest()->get();

        return fractal()
            ->collection($posts)
            ->transformWith(new PostTransformer())
            ->toArray();
    }

    public function show(Post $post)
    {
        return fractal()
            ->item($post)
            ->transformWith(new PostTransformer())
            ->toArray();
    }

    public function store(Request $request)
    {

        $this->validate($request, [
            'body' => 'required'
        ]);

        $post = $request->user()->posts()->create($request->only('body'));

        broadcast(new PostCreated($post))->toOthers();

        return fractal()
            ->item($post)
            ->transformWith(new PostTransformer())
            ->toArray();

    }

}
