$(document).ready(function () {
    $('#submit').on('keyup', function (e) {
        let keyword = e.target.value;
        $.ajax({
            type: "GET",
            url: "https://api.github.com/users/" + keyword,
            data: {
                client_id: 'b676c69fc700fe05df31',
                client_secret: 'dd2b5502eab3d478d3f54f851470c91ce500c19e'
            },

        }).done(function(data){
            $.ajax({
                type: "GET",
                url: "https://api.github.com/users/" + keyword + "/repos?per_page=5",
                data: {
                    client_id: 'b676c69fc700fe05df31',
                client_secret: 'dd2b5502eab3d478d3f54f851470c91ce500c19e'
                },
            }).done(function(daata){
                console.log(daata);
                $.each(daata, (i, element)=> { 
                    $(".repos").append(`
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p class="h3">${element.name}</p>
                                        <p class="h5">${element.description}</p>
                                    </div>
                                    <div class="col-md-4">
                                    <span class="badge badge-pill badge-primary">Forks: ${element.forks_count}</span>
                                    <span class="badge badge-pill badge-primary">watchers: ${element.watchers_count}</span>
                                    <span class="badge badge-pill badge-primary">Stars: ${element.stargazers_count}</span>
                                    </div>
                                    <div class="col-md-2">
                                        <a class="btn btn-act btn-primary" href="${element.html_url}" target="_blank">See more</a>
                                        ${languageColor(element.language)}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <br>
                    `);
                     
                });
                });
            
            $('#result').html(`
            <div class="card" >
                <div class="card-header"> 
                    <p class="h3">${data.name} </p>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${data.avatar_url}" class="img-thumbnail">
                            <a class="btn btn-success btn-block" href = " ${data.html_url} "target="_blank"> Visit Profile </a>
                        </div>
                        <div class="col-md-9">
                            <span class="badge badge-pill badge-primary">Repositories: ${data.public_repos}</span>
                            <span class="badge badge-pill badge-secondary">Gists: ${data.public_gists}</span>
                            <span class="badge badge-pill badge-success">Followers: ${data.followers}</span>
                            <span class="badge badge-pill badge-danger">Following: ${data.following}</span>
                            <br>
                            <br>
                            <ul class="list-group" id="nw">
                                <li class="list-group-item list-group-item-primary">Company: ${data.company}</li>
                                <li class="list-group-item list-group-item-primary">Website: ${data.blog}</li>
                                <li class="list-group-item list-group-item-primary">Location: ${data.location}</li>
                                <li class="list-group-item list-group-item-primary">E-mail: ${data.email}</li>
                            </ul>
                        </div>
                    </div> 
                </div>
            </div>
            <div class="repos">
                
            </div>
            
            `);
            })
        })
        let languageColor = function(item) {
        switch (item) {
            case "HTML":
                return '<p class="language text-html">HTML</p>';
                break;
            case "JavaScript":
                return '<p class="language text-warning">JavaScript</p>';
                break;
            case "PHP":
                return '<p class="language text-php">PHP</p>';
                break;
            case "TypeScript":
                return '<p class="language text-ts">TypeScript</p>';
                break;
            case "C#":
              return '<p class="language text-cs">C#</p>';
                break;
            case "Ruby":
                return '<p class="language text-r">Ruby</p>';
                break;
            case "C":
                return '<p class="language text-c">C</p>';
                break;
            case "Python":
                return '<p class="language text-ph">Python</p>';
                break;
            case "C++":
                return '<p class="language text-cp">C++</p>';
                break;
            default:
                return '<p class="language ">' + item + '</p>';
                break;
  }
};
        });
