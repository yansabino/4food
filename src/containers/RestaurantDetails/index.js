import React, { Component } from "react";
import { connect } from "react-redux";
import { push, goBack } from "connected-react-router";
import { routes } from "../Router/";
import AppBarComponent from "../../components/AppBarComponent";
import styled from "styled-components";
import { RestaurantItemCard } from "./../../components/RestaurantItemCard";
import LinearProgress from "@material-ui/core/LinearProgress";
import ModalPopUp from "../../components/Modal";

const Container = styled.div`
  margin: 0 auto;
  margin-top: 55px;
  width: 100%;
`;

const Card = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-block-start: 8px;
  margin-block-end: 8px;
  border-radius: 8px;
  padding: 10px;
`;

const Img = styled.img`
  height: 120px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Info = styled.div`
  height: 36.17%;
  margin: 0 16px;
`;

const Name = styled.p`
  width: 328px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #e8222e;
`;

const OtherInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const OtherInfo = styled.div`
  width: 328px;
  height: 18px;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.39px;
  color: #b8b8b8;
  margin: 2px 0;
`;

class RestaurantDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalDisplay: false,
      productData: "",
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");

    if (token === null) {
      this.props.goToLoginPage();
    } else if (this.props.selectRestaurant === undefined) {
      this.props.goBackPage();
    }
  }

  handleModalDisplay = (item) => {
    this.setState({
      modalDisplay: !this.state.modalDisplay,
      productData: item,
    });
  };

  render() {
    // Evitar Problemas quando atualizamos a pagina de ver detalhes
    if (this.props.selectRestaurant === undefined) {
      return <LinearProgress />;
    }

    //Pegar todas as categorias de produtos do restaurante
    const allCategories = this.props.selectRestaurant.products.map((el) => {
      return el.category;
    });

    //Eliminar as categorias repetidas
    const uniqueCategories = Array.from(new Set(allCategories));

    //Pegar os produtos de cada categoria, retornando um objeto com a categoria e o array de produtos
    const categoryItens = uniqueCategories.map((category) => {
      const itensOfCategory = this.props.selectRestaurant.products.filter(
        (item) => {
          return item.category === category;
        }
      );
      return {
        category,
        itens: itensOfCategory,
      };
    });

    const { selectRestaurant } = this.props;

    return (
      <div>
        <AppBarComponent
          imageDisplay={true}
          title="Restaurante"
          onClickButton={this.props.goBackPage}
        />

        <Container>
          <Card>
            {/* se tivermos tempo, aprender o canvas */}
            <Img src={selectRestaurant.logoUrl} />
            <Info>
              <Name>{selectRestaurant.name}</Name>
              <OtherInfoContainer>
                <OtherInfo>{selectRestaurant.category}</OtherInfo>
              </OtherInfoContainer>
              <OtherInfoContainer>
                <OtherInfo>
                  {selectRestaurant.deliveryTime} -{" "}
                  {selectRestaurant.deliveryTime + 10} min
                </OtherInfo>
                <OtherInfo>
                  Frete R$ {Number(selectRestaurant.shipping).toFixed(2)}
                </OtherInfo>
              </OtherInfoContainer>
              <OtherInfoContainer>
                <OtherInfo>{selectRestaurant.address}</OtherInfo>
              </OtherInfoContainer>
            </Info>
          </Card>
        </Container>
        {categoryItens.map((item) => (
          <RestaurantItemCard
            itemData={item}
            onClickAdd={this.handleModalDisplay}
          />
        ))}
        {this.state.modalDisplay && (
          <ModalPopUp
            idRestaurant={selectRestaurant.id}
            product={this.state.productData}
            changeDisplayState={this.handleModalDisplay}
            openPopUp={this.state.modalDisplay}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  goBackPage: () => dispatch(goBack()),
  goToLoginPage: () => dispatch(push(routes.loginPage)),
});

const mapStateToProps = (state) => ({
  selectRestaurant: state.restaurants.restaurantDetails,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantDetails);
