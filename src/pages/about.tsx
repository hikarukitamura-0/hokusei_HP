import { Container, Typography, Box, Divider, Link } from '@mui/material';
import Physics from '../assets/physics.png';

const About = () => {
  return (
    <Box sx={{paddingTop: '191px',}}>
        <Box 
          sx={{
            display: 'flex',  justifyContent: 'center'
          }} >
          <img 
            src={Physics} 
            alt="Physics background illustration" 
            style={{ width:'100%'}} // 画像をBox全体にフィットさせる
          />
        </Box>
      <Container maxWidth="md"> {/* コンテンツの幅を制限し、中央に配置 */}
        
        {/* 1. ヒーロー画像セクション */}
  
        
        {/* 2. 概要テキストセクション */}
        <Box sx={{ mt: 4, mb: 6 }}>
          {/* メインタイトル */}
          <Typography variant="h3" component="h1" gutterBottom align="center" 
            sx={{ fontWeight: 'bold' }}>
            電磁気学から展開される<br/>特殊相対性理論
          </Typography>
          
          <Divider sx={{ my: 3 }} />
  
          {/* 導入文 */}
          <Typography variant="body1" paragraph 
            sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              
            19世紀に, J.C.Maxwellによって電磁気現象が統一された際, その基礎方程式であるMaxwell方程式は, 光が電磁波の一種であることを示し, その速度を
            物理定数から決定した. しかし, このとき決定された「光速」は, 当時の常識であった古典力学ではうまく扱えず, 特に速度の加法法則と矛盾した. 
            光速が観測者の運動状態に依存しないというMichelson-Morleyの実験結果は, エーテル仮設を否定し, 新たな時空の再構築を要請したのである. 
            
            本研究の目的は, この歴史的な転換点, 即ちMaxwell方程式が内包する光速度を検証し, この光速の特性こそが特殊相対性理論の原理を必然的な帰結として導きだし, 
            最終的にLorentz変換とMinkowski時空の導入に至った経緯を論理的に説明することである. 
          </Typography>
          <li>
            <a>電磁気学同好会</a>
          </li>
          
          {/* 詳細な説明 */}
          <Typography variant="h5" component="h2" sx={{ mt: 4, mb: 2, fontWeight: 'medium' }}>
            私たちのミッション
          </Typography>
          <Typography variant="body1" paragraph>
            私たちは、最新の量子論の進歩や、古典物理学の基礎、相対性理論の解説など、質の高い記事を日々提供しています。難解な数式 $E=mc^2$ の意味から、素粒子 , Z^0$ の振る舞いまで、あなたの知的好奇心を刺激するコンテンツを厳選しています。
          </Typography>
          
          {/* 締めくくり */}
          <Typography variant="body2" sx={{ mt: 5, color: 'text.secondary', textAlign: 'right' }}>
            知識は力なり。一緒に物理の世界を旅しましょう。
          </Typography>
        </Box>
        
      </Container>
    </Box>
  );
};

export default About;