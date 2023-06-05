import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sitiosService from "../../../../services/sitios.services";
import { Loader } from "../../../../components";

const SitioID = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sitio, setSitio] = useState({});
  const { id } = useParams();

  useEffect(() => {
    try {
      sitiosService.getServicioById(id).then((response) => {
        setIsLoading(false);
        console.log(response);
        setSitio(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div class="container blog-detail-section">
          <div class="row">
            <div class="col-xl-6">
              <div class="sidebar">
                <div class="panel panel-success">
                  <div class="panel-heading">Recent Posts</div>
                </div>
              </div>
            </div>{" "}
            <div class="col-xl-6">
              <div class="blog-detail">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{sitio.nombre_sitio}</h5>
                    <div class="content">
                      <p>
                        <strong>Telefono</strong> {sitio.telefono}
                      </p>
                      <p>
                        <strong>Comentarios</strong>
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged.
                        It was popularised in the 1960s with the release of
                        Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like
                        Aldus PageMaker including versions of Lorem Ipsum.
                      </p>
                      <p>
                        <strong>Where can I get some?</strong>
                      </p>
                      <p>
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All the Lorem Ipsum generators on the Internet
                        tend to repeat predefined chunks as necessary, making
                        this the first true generator on the Internet. It uses a
                        dictionary of over 200 Latin words, combined with a
                        handful of model sentence structures, to generate Lorem
                        Ipsum which looks reasonable. The generated Lorem Ipsum
                        is therefore always free from repetition, injected
                        humour, or non-characteristic words etc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SitioID;
